const converter = require('./converter');

test('Celsius to Fahrenheit', () => {
    expect(converter.celsiusToFahrenheit(0)).toBe(32);
});

test('Fahrenheit to Celsius', () => {
    expect(converter.fahrenheitToCelsius(32)).toBe(0);
});

test('Celsius to Kelvin', () => {
    expect(converter.celsiusToKelvin(0)).toBeCloseTo(273.15);
});

# Check nodes
kubectl get nodes -o wide

# Create frontend YAML
nano frontend.yaml

//frontend.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: nginx
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30007


# Apply frontend
kubectl apply -f frontend.yaml

# Verify frontend
kubectl get pods
kubectl get services

# Create backend YAML
nano backend.yaml

//backend.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: nginx
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
    - port: 80
      targetPort: 80


# Apply backend
kubectl apply -f backend.yaml

# Final verification
kubectl get pods
kubectl get services
kubectl get all

# Describe any pod
kubectl describe pod frontend-xxxxx

# Get worker node IP
kubectl get nodes -o wide

http://<worker-node-ip>:30007




test('Kelvin to Celsius', () => {
    expect(converter.kelvinToCelsius(273.15)).toBeCloseTo(0);
});
