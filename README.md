# Fuel — Calorie & Macro Tracker

Mobile-first, offline-first food log. No account, no backend. Data lives in the phone's localStorage.

## Features
- Daily food log across Breakfast / Lunch / Dinner / Snacks, with calories, protein, carbs, fat per item
- 72-food built-in bilingual database (EN/ES), plus custom entries
- Optional USDA FoodData Central search (paste a free key from api.nal.usda.gov in Settings)
- Daily calorie + macro goals with progress bars, editable in Settings
- Photo attach on any food entry (visual journal; stored locally on the device)
- Weight log with 30-day chart and goal tracking
- Grocery list with healthy-staples shortcut
- Day streak, EN/ES toggle, JSON data export

## Deploy
Push this folder to a GitHub repo and enable GitHub Pages (Settings > Pages > Deploy from branch, root).

## Notes
- Photo-based automatic calorie estimation is not included; it needs an AI vision backend. Photos are kept as a visual journal alongside manual entries.
- USDA `DEMO_KEY` is rate-limited; a free personal key is recommended for regular use.
