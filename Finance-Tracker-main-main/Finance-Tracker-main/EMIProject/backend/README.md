# FinTrack AI – Backend Foundation Architecture

Production-grade Django 5+ & REST Framework backend foundation for **FinTrack AI – Intelligent Personal Financial Intelligence & AI Fraud Detection Platform**.

---

## 🚀 Key Architectural Features

- **Clean Architecture & Separation of Concerns**: Modular domain design (`apps/`), base models (`core/models.py`), Repository Layer (`repositories/`), and Service Layer (`services/`).
- **Standardized API Response Envelopes**: Global Renderer (`StandardJSONRenderer`) & Exception Handler (`exceptions.py`).
- **SimpleJWT Authentication**: Secure Bearer Token strategy.
- **OpenAPI v3 & Swagger UI**: Auto-generated API documentation via `drf-spectacular`.
- **Health Check Endpoint**: `/api/v1/health/` validating DB connection, Redis cache status, and version metadata.
- **OWASP Hardening**: Security headers middleware, XSS protection, and soft-delete capabilities.

---

## 🛠️ Quickstart Setup

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
pip install -r requirements.txt

# 3. Apply migrations
python manage.py migrate

# 4. Start Development Server
python manage.py runserver
```

---

## 📌 API Endpoints

- **Health Check**: `GET /api/v1/health/`
- **Swagger Documentation UI**: `GET /api/docs/`
- **OpenAPI v3 Schema**: `GET /api/schema/`
