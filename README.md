# IELTS Writing Notebook

A small local React Native / Expo app for IELTS Writing practice.

## What it does

- Displays your IELTS Writing PDF.
- Shows the course contents from the supplied image.
- Uses a split-screen layout on wide screens.
- Uses PDF / Notes tabs on narrow screens.
- Lets you select Unit 1–10.
- Gives each unit its Task 1 and Task 2 topics.
- Auto-saves notes locally with AsyncStorage.
- Notes survive app restarts.

## 1. Create the project

This starter assumes an Expo SDK 54 environment.

Copy the files into a project folder, then run:

```bash
npm install
```

## 2. Add your PDF

The supplied image is only the table of contents. Put the actual PDF you want to study at:

```text
assets/ielts-writing.pdf
```

The filename must be exactly `ielts-writing.pdf`.

## 3. Run on your Mac

Because `react-native-pdf` is a native module, use an iOS development build rather than Expo Go:

```bash
npx expo prebuild
npx expo run:ios
```

You can also start Metro separately:

```bash
npx expo start
```

## Suggested next features

1. Save notes separately for every unit.
2. Add a "Task 1 / Task 2 practice" page.
3. Add a writing timer (20 / 40 / 60 minutes).
4. Add word count.
5. Add an IELTS error log.
6. Add a vocabulary notebook.
7. Add search by unit/topic.
8. Add a dark mode.
9. Add an export-to-Markdown feature.
10. Add a "Today's IELTS study session" dashboard.
