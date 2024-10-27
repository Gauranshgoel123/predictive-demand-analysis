from prophet import Prophet
import pandas as pd

def demand_predictor():
    data = pd.read_csv("data/historical_data.csv")
    data['ds'] = pd.to_datetime(data['date'])
    data['y'] = data['demand']

    model = Prophet()
    model.fit(data[['ds', 'y']])

    future = model.make_future_dataframe(periods=30)  # Predict 30 days ahead
    forecast = model.predict(future)
    return forecast[['ds', 'yhat']].to_dict(orient='records')
