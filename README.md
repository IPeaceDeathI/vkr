# 🚀 Локальный запуск сайта

Чтобы развернуть сайт на локальной машине, выполните следующие шаги:

---

### 1️⃣ Клонируйте репозиторий в отдельную папку
```bash
git clone https://github.com/IPeaceDeathI/vkr.git
cd vkr
```

### 2️⃣ Перейдите в папку frontend и скачайте зависимости
```bash
cd frontend
npm i --legacy-peer-deps
```

### 3️⃣ Соберите и запустите проект с помощью Docker
```bash
cd ..
docker-compose up --build -d
```

### 4️⃣ Перейдите в браузере по адресу
```
http://localhost
```
