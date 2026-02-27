# Unit V: Predictive Analytics (English Summary)

### Topics
1. [Predictive Analytics](#1-predictive-analytics)
2. [Simple Linear Regression](#2-simple-linear-regression)
3. [Multiple Linear Regression](#3-multiple-linear-regression)
4. [Interpretation of Regression Coefficients](#4-interpretation-of-regression-coefficients)
5. [Visualizations](#5-visualizations)
6. [Visual Data Analysis Techniques](#6-visual-data-analysis-techniques)
7. [Interaction Techniques](#7-interaction-techniques)
8. [Systems and Applications](#8-systems-and-applications)

## 1. Predictive Analytics

Predictive analytics uses past data to forecast what is likely to happen next. It involves feature engineering, model training, validation and deployment. Organisations apply it to anticipate demand, detect fraud, or personalise services.

> **Example:** A bank builds a model to predict loan defaults based on customer income, credit history and account activity.

## 2. Simple Linear Regression

A simple regression fits a straight line through a scatter of points to describe the relationship between one independent variable and a dependent variable. The line is determined by minimizing squared errors.

- Formula: $y = \beta_0 + \beta_1 x + \varepsilon$.
- Key metrics: slope, intercept, $R^2$ (explained variance).
- Assumptions: linearity, independence, constant variance, normal errors.

### Diagnostic example
Plot residuals vs fitted values; if a pattern emerges, the linear assumption may be violated.

## 3. Multiple Linear Regression

When multiple predictors are present, multiple regression quantifies their joint effects on the response. Coefficients reflect the change in $y$ per unit change in each $x$, holding others constant.

- Includes interaction and polynomial terms to capture complex relationships.
- Requires caution about multicollinearity; use VIF to detect.
- Model selection uses adjusted $R^2$, AIC or BIC.

> **Example:** Housing price = baseline + 120 × size − 8 × age + 10 × bedrooms.

## 4. Interpretation of Regression Coefficients

Coefficients are meaningful when units and scaling are clear. Statistical significance is tested via t‑tests; p‑values below 0.05 typically indicate a predictor contributes to the model.

- Confidence intervals convey uncertainty.
- Dummy variables compare categories against a reference.
- Interaction coefficients indicate how one variable modifies the effect of another.

## 5. Visualizations

Graphical tools help evaluate models:

- Scatter plots with fitted lines show overall fit.
- Residual plots reveal heteroscedasticity or non‑linearity.
- Q‑Q plots check normality of residuals.
- Coefficient plots display estimates with confidence bands.

```mermaid
flowchart LR
 Scatter --> Line
 Line --> Residuals
 Residuals --> QQ
``` 

## 6. Visual Data Analysis Techniques

Exploratory Data Analysis (EDA) uses plots to understand variable distributions and relationships.
- Histograms/densities for single-variable distribution.
- Box plots for comparing across groups.
- Pair plots/heatmaps for multivariate relationships.
- Time series plots for trends and seasonality.

Interactive dashboards (Tableau, Power BI, Dash) enable dynamic filtering and cross‑highlighting.

## 7. Interaction Techniques

Interactions let users engage with visualisations:
- Zoom and pan to inspect detail.
- Brushing selects points in one view and highlights them in another.
- Filtering restricts data dynamically.
- Sliders adjust parameters such as regression coefficients or thresholds.

These techniques are supported by libraries like D3.js, Plotly, Shiny, and Dash.

## 8. Systems and Applications

Predictive analytics systems combine data pipelines, storage, computation and serving.

- **Data ingestion:** ETL tools like Kafka or NiFi.
- **Storage:** data lakes/warehouses, feature stores.
- **Model training:** Spark MLlib, scikit‑learn, TensorFlow.
- **Serving:** REST APIs, dashboards.

Applications span finance (credit scoring), retail (demand forecasting), healthcare (readmission prediction), and manufacturing (predictive maintenance).

> **Case study:** A logistics company used a predictive model to cut late deliveries by 15 % and improved customer satisfaction.