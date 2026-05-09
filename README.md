[![GitHub last commit](https://img.shields.io/github/last-commit/becta31/himik-vercel-api?style=flat-square)](https://github.com/becta31/himik-vercel-api/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/becta31/himik-vercel-api?style=flat-square)](https://github.com/becta31/himik-vercel-api)
[![GitHub license](https://img.shields.io/github/license/becta31/himik-vercel-api?style=flat-square)](https://github.com/becta31/himik-vercel-api/blob/main/LICENSE)
[![Website](https://img.shields.io/website?up_message=online&up_color=green&down_message=offline&down_color=red&url=https%3A%2F%2Fhimik-vercel-api.vercel.app%2F&style=flat-square)](https://himik-vercel-api.vercel.app)

# 🧪 ХИМИК — Интерактивный тренажер

> Современный веб-тренажер для изучения периодической таблицы Менделеева.

**🔗 Демо-версия:** [himik-vercel-api.vercel.app](https://himik-vercel-api.vercel.app)

---

## 📖 О проекте

"ХИМИК" — это образовательная платформа, созданная для помощи школьникам и студентам в изучении химии. Проект демонстрирует современный подход к разработке веб-приложений с использованием **Serverless-архитектуры**.

### Ключевые возможности:
*   📚 **Режим обучения:** Интерактивные карточки с подробной информацией о каждом элементе.
*   🎯 **Викторина:** Проверка знаний с системой подсчета очков и серий.
*   🏆 **Рейтинг:** Таблица лидеров с сохранением результатов в базу данных.
*   🔍 **Умный поиск:** Мгновенная фильтрация и поиск элементов.
*   📱 **Адаптивность:** Идеально работает на компьютерах и мобильных устройствах.

---

## 🛠 Технологический стек

| Категория | Технологии |
| :--- | :--- |
| **Frontend** | HTML5, Tailwind CSS, Vanilla JavaScript (ES6+), Vanta.js |
| **Backend** | Node.js, Vercel Serverless Functions |
| **Database** | MongoDB Atlas |
| **Infrastructure** | Vercel (CDN, CI/CD), GitHub |

---

## 🚀 Как запустить локально

Так как проект использует `fetch` для загрузки данных, его нужно запускать через локальный веб-сервер.

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/becta31/himik-vercel-api.git
   ```
2. **Запустите через Live Server (VS Code):**
   *   Откройте папку проекта в VS Code.
   *   Установите расширение **Live Server**.
   *   Нажмите кнопку **"Go Live"** внизу справа.

Или используйте Python:
```bash
# Python 3
python -m http.server 8000
```

---

## 📂 Структура проекта

*   `/api` — Serverless функции для работы с базой данных.
*   `index.html` — Главная страница.
*   `study.html` — Режим обучения.
*   `quiz.html` — Режим викторины.
*   `elements.json` — База данных химических элементов.
*   `ARCHITECTURE.md` — Подробное описание архитектуры.

---

## 📄 Документация

*   [Архитектура проекта (ARCHITECTURE.md)](./ARCHITECTURE.md) — как устроена система.
*   [API Документация (API_DOCS.md)](./API_DOCS.md) — как работать с бэкендом.
*   [Руководство для участников (CONTRIBUTING.md)](./CONTRIBUTING.md) — как помочь проекту.
---

## 👤 Автор

**becta31**
*   GitHub: [@becta31](https://github.com/becta31)

## 📝 Лицензия

Проект распространяется под лицензией **MIT**. Подробнее см. в файле [LICENSE](LICENSE).
