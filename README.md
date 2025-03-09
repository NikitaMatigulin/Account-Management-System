# Account Management System

Система управления учетными записями, разработанная с использованием Vue 3, TypeScript и Element Plus.

## Функциональность

- Создание и управление учетными записями
- Поддержка двух типов учетных записей: LDAP и локальные
- Возможность добавления меток к учетным записям
- Валидация полей
- Сохранение данных в localStorage
- Адаптивный дизайн

## Технологии

- Vue 3 с Composition API
- TypeScript
- Pinia для управления состоянием
- Element Plus для UI компонентов
- Vite как инструмент сборки

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка для продакшена
npm run build
```

## Структура проекта

```
src/
├── components/     # Vue компоненты
├── stores/        # Хранилища Pinia
├── types/         # TypeScript типы
├── router/        # Конфигурация маршрутизации
└── assets/        # Статические ресурсы
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
