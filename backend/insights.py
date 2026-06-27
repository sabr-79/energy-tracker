import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib
from database import SessionLocal
from models import DailyLog
import math

def fetch_logs_as_dataframe():
    """Pull all logs from database into a pandas DataFrame"""
    db = SessionLocal()
    logs = db.query(DailyLog).all()
    db.close()
    
    data = []
    for log in logs:
        data.append({
            'date': log.log_date,
            'sleep': log.sleep,
            'water': log.water,
            'energy': log.energy,
            'fog': log.fog
        })
    
    df = pd.DataFrame(data)
    return df

def analyze_correlations(df):
    """Find simple correlations between variables"""
    numeric_df = df[['sleep', 'water', 'energy', 'fog']]
    
    correlations = numeric_df.corr()
    
    insights = {}
    
    # Sleep vs Energy (positive correlation expected)
    insights['sleep_energy_correlation'] = correlations.loc['sleep', 'energy']
    
    # Water vs Fog (negative correlation expected - more water = less fog)
    insights['water_fog_correlation'] = correlations.loc['water', 'fog']
    
    # Sleep vs Fog (negative correlation expected)
    insights['sleep_fog_correlation'] = correlations.loc['sleep', 'fog']
    
    # Water vs Energy (positive correlation expected)
    insights['water_energy_correlation'] = correlations.loc['water', 'energy']
    
    return insights, correlations

def train_energy_predictor(df):
    """
    Train a model to predict energy level from sleep, water, and fog
    """
    # Features (X) and target (y)
    X = df[['sleep', 'water', 'fog']].values
    y = df['energy'].values
    
    # Split into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Train a linear regression model
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    # Evaluate on test set
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    # Save the model to disk
    joblib.dump(model, 'energy_predictor.joblib')
    
    return {
        'model': model,
        'mse': mse,
        'r2': r2,
        'feature_importance': dict(zip(['sleep', 'water', 'fog'], model.coef_))
    }

def sanitize_value(value):
    """Recursively clean NaN and Infinity values so JSON doesn't crash."""
    if isinstance(value, float):
        if math.isnan(value) or math.isinf(value):
            return None  
        return value
    if isinstance(value, dict):
        return {k: sanitize_value(v) for k, v in value.items()}
    if isinstance(value, list):
        return [sanitize_value(v) for v in value]
    return value

def generate_insights():
    """Main function to run all analysis"""
    df = fetch_logs_as_dataframe()
    
    if len(df) < 5:
        return {
            'error': 'Not enough data. Need at least 5 logs for analysis.',
            'log_count': len(df)
        }
    
    # Basic statistics
    stats = {
        'avg_sleep': df['sleep'].mean(),
        'avg_water': df['water'].mean(),
        'avg_energy': df['energy'].mean(),
        'avg_fog': df['fog'].mean(),
        'log_count': len(df)
    }
    
    # Correlations
    insights, correlation_matrix = analyze_correlations(df)
    
    # Train predictor model
    model_result = train_energy_predictor(df)
    
    raw_result = {
        'stats': stats,
        'insights': insights,
        'model': {
            'r2_score': model_result['r2'],
            'feature_importance': model_result['feature_importance']
        },
    }
    return sanitize_value(raw_result)

