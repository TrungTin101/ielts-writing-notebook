
import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PdfViewer from "./PdfViewer";
import { StatusBar } from "expo-status-bar";

type Unit = {
  id: number;
  title: string;
  page: number;
  task1: string[];
  task2: string[];
};

const UNITS: Unit[] = [
  {
    id: 1,
    title: "Education",
    page: 6,
    task1: [
      "Education vocabulary",
      "Identifying and ordering key trends",
      "Overview of visual data questions",
    ],
    task2: [
      "Understanding the question",
      "Nouns in questions and introductions",
      "Overview of essay structures",
    ],
  },
  {
    id: 2,
    title: "Communication and the internet",
    page: 14,
    task1: ["Noun phrases", "Describing trends", "Adjectives and adverbs"],
    task2: [
      "Adjective and noun forms to establish opinion",
      "Introducing an evaluation and opinion essay",
      "Organizing ideas",
    ],
  },
  {
    id: 3,
    title: "Tourism and travel",
    page: 22,
    task1: [
      "Travel and tourism vocabulary",
      "Describing a flow chart",
      "Cause and consequence",
    ],
    task2: [
      "Noun phrases",
      "Structuring viewpoints",
      "Presenting and refuting a viewpoint",
    ],
  },
  {
    id: 4,
    title: "Culture",
    page: 30,
    task1: [
      "Comparing statistics",
      "Using comparatives & superlatives",
      "Contrastive linkers & adverbial clauses",
    ],
    task2: [
      "Vocabulary related to culture",
      "Forms for hypothesis and concluding statements",
      "Structuring a problem-solving essay",
    ],
  },
  {
    id: 5,
    title: "People and the environment",
    page: 38,
    task1: [
      "Environmental vocabulary",
      "Describing a trend over time",
      "Time expressions",
    ],
    task2: [
      "Vocabulary related to buildings",
      "Stating opinions",
      "Giving examples",
    ],
  },
  {
    id: 6,
    title: "Food and the environment",
    page: 46,
    task1: [
      "Food and nutrition vocabulary",
      "Expressing purpose",
      "Structure of a flow chart essay",
    ],
    task2: [
      "Giving reasons",
      "Ordering an ‘evaluating solutions’ essay",
      "Referencing to avoid repetition",
    ],
  },
  {
    id: 7,
    title: "The working world",
    page: 54,
    task1: [
      "Work collocations",
      "Participle phrases",
      "Identifying exceptions",
    ],
    task2: [
      "Fronting sentences",
      "Opinion phrases",
      "Commonly used language",
    ],
  },
  {
    id: 8,
    title: "Sports and activities",
    page: 62,
    task1: [
      "Spelling errors",
      "Sporting vocabulary",
      "Finding correlations",
    ],
    task2: [
      "Word class",
      "Relative clauses",
      "Ordering a conclusion",
    ],
  },
  {
    id: 9,
    title: "Crime and money",
    page: 70,
    task1: [
      "Crime vocabulary",
      "Clarifying meaning",
      "Using articles",
    ],
    task2: [
      "Language related to money",
      "Softening and hedging statements",
      "Solutions essay",
    ],
  },
  {
    id: 10,
    title: "Language and culture",
    page: 78,
    task1: [
      "Synonyms",
      "Understanding data information",
      "Review of linkers",
    ],
    task2: [
      "Essay types",
      "Typical errors",
      "Editing your work",
    ],
  },
];

const NOTES_KEY = "ielts-writing-notes-v1";

export default function App() {
  const { width } = useWindowDimensions();
  const wide = width >= 900;

  const [selectedUnit, setSelectedUnit] = useState(1);
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(true);
  const [mode, setMode] = useState<"pdf" | "notes">("pdf");

  const unit = useMemo(
    () => UNITS.find((item) => item.id === selectedUnit) ?? UNITS[0],
    [selectedUnit]
  );

  // Load saved notes
  useEffect(() => {
    AsyncStorage.getItem(NOTES_KEY).then((value) => {
      if (value !== null) {
        setNotes(value);
      }
    });
  }, []);

  // Auto-save notes
  useEffect(() => {
    const timer = setTimeout(async () => {
      await AsyncStorage.setItem(NOTES_KEY, notes);
      setSaved(true);
    }, 500);

    if (notes) {
      setSaved(false);
    }

    return () => clearTimeout(timer);
  }, [notes]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        {/* App title */}
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>IELTS Writing Notebook</Text>

          <Text style={styles.subtitle}>
            PDF + notes • Unit {unit.id}: {unit.title}
          </Text>
        </View>

        {/* Right side of header */}
        <View style={styles.headerRight}>
          {/* Love image */}
          <Image
            source={require("./assets/love.jpg")}
            style={styles.headerImage}
            resizeMode="cover"
          />

          {/* Mobile PDF / Notes switch */}
          {!wide && (
            <View style={styles.segment}>
              <Pressable
                onPress={() => setMode("pdf")}
                style={[
                  styles.segmentButton,
                  mode === "pdf" && styles.segmentActive,
                ]}
              >
                <Text style={styles.segmentText}>PDF</Text>
              </Pressable>

              <Pressable
                onPress={() => setMode("notes")}
                style={[
                  styles.segmentButton,
                  mode === "notes" && styles.segmentActive,
                ]}
              >
                <Text style={styles.segmentText}>Notes</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {/* ================= BODY ================= */}
      <View style={[styles.body, !wide && styles.bodyNarrow]}>
        {/* ================= SIDEBAR ================= */}
        <View style={[styles.sidebar, !wide && styles.sidebarNarrow]}>
          <Text style={styles.sidebarTitle}>Course contents</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {UNITS.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setSelectedUnit(item.id)}
                style={[
                  styles.unitButton,
                  item.id === selectedUnit && styles.unitButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.unitNumber,
                    item.id === selectedUnit && styles.activeText,
                  ]}
                >
                  Unit {item.id}
                </Text>

                <Text
                  numberOfLines={2}
                  style={[
                    styles.unitTitle,
                    item.id === selectedUnit && styles.activeText,
                  ]}
                >
                  {item.title}
                </Text>

                <Text style={styles.pageText}>p. {item.page}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* ================= PDF PANEL ================= */}
        {(wide || mode === "pdf") && (
          <View style={styles.pdfPanel}>
            <View style={styles.panelHeader}>
              <View>
                <Text style={styles.panelTitle}>Course PDF</Text>

                <Text style={styles.panelHint}>
                  Put your PDF at assets/ielts-writing.pdf
                </Text>
              </View>

              <View style={styles.pageBadge}>
                <Text style={styles.pageBadgeText}>
                  Unit {unit.id} • p.{unit.page}
                </Text>
              </View>
            </View>

            <View style={styles.pdfBox}>
              <PdfViewer />
            </View>
          </View>
        )}

        {/* ================= NOTES PANEL ================= */}
        {(wide || mode === "notes") && (
          <View style={styles.notesPanel}>
            <View style={styles.panelHeader}>
              <View>
                <Text style={styles.panelTitle}>My IELTS Notes</Text>

                <Text style={styles.panelHint}>
                  Auto-saved locally on this device
                </Text>
              </View>

              <Text style={styles.saveStatus}>
                {saved ? "Saved" : "Saving…"}
              </Text>
            </View>

            <ScrollView
              style={styles.notesScroll}
              contentContainerStyle={styles.notesContent}
            >
              <Text style={styles.unitHeading}>
                Unit {unit.id}: {unit.title}
              </Text>

              {/* Task 1 */}
              <Text style={styles.sectionLabel}>TASK 1</Text>

              {unit.task1.map((topic) => (
                <Text key={topic} style={styles.topic}>
                  • {topic}
                </Text>
              ))}

              {/* Task 2 */}
              <Text style={styles.sectionLabel}>TASK 2</Text>

              {unit.task2.map((topic) => (
                <Text key={topic} style={styles.topic}>
                  • {topic}
                </Text>
              ))}

              <View style={styles.divider} />

              <Text style={styles.noteLabel}>Your notes</Text>

              <TextInput
                value={notes}
                onChangeText={setNotes}
                multiline
                textAlignVertical="top"
                placeholder={
                  "Vocabulary:\n\nUseful structures:\n\nExamples:\n\nMy mistakes:\n\nTask 1 / Task 2 practice:"
                }
                placeholderTextColor="#9aa0a6"
                style={styles.textInput}
              />
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f6f7f9",
  },

  /* ================= HEADER ================= */

  header: {
    height: 74,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e5e9",
    backgroundColor: "#ffffff",
  },

  titleContainer: {
    flex: 1,
  },

  appTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#202124",
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
    color: "#6b7280",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  headerImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },

  /* ================= MOBILE SEGMENT ================= */

  segment: {
    flexDirection: "row",
    backgroundColor: "#eef0f3",
    borderRadius: 10,
    padding: 3,
  },

  segmentButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },

  segmentActive: {
    backgroundColor: "#ffffff",
  },

  segmentText: {
    fontWeight: "600",
    color: "#333840",
  },

  /* ================= BODY ================= */

  body: {
    flex: 1,
    flexDirection: "row",
  },

  bodyNarrow: {
    flexDirection: "column",
  },

  /* ================= SIDEBAR ================= */

  sidebar: {
    width: 245,
    backgroundColor: "#ffffff",
    borderRightWidth: 1,
    borderRightColor: "#e2e5e9",
    padding: 12,
  },

  sidebarNarrow: {
    display: "none",
  },

  sidebarTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#737982",
    paddingHorizontal: 8,
    paddingVertical: 10,
    textTransform: "uppercase",
  },

  unitButton: {
    padding: 11,
    marginBottom: 4,
    borderRadius: 9,
  },

  unitButtonActive: {
    backgroundColor: "#eaf4e5",
  },

  unitNumber: {
    fontSize: 12,
    fontWeight: "700",
    color: "#737982",
  },

  unitTitle: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 19,
    color: "#25282d",
  },

  pageText: {
    marginTop: 3,
    fontSize: 11,
    color: "#9aa0a6",
  },

  activeText: {
    color: "#4d8f38",
  },

  /* ================= PDF ================= */

  pdfPanel: {
    flex: 1.15,
    minWidth: 360,
    padding: 12,
  },

  pdfBox: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "#dfe3e8",
    borderWidth: 1,
    borderColor: "#d5d9de",
  },

  /* ================= NOTES ================= */

  notesPanel: {
    flex: 1,
    minWidth: 320,
    padding: 12,
  },

  panelHeader: {
    height: 54,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  panelTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#202124",
  },

  panelHint: {
    marginTop: 2,
    fontSize: 11,
    color: "#8a9098",
  },

  pageBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#eef5ea",
  },

  pageBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4d8f38",
  },

  notesScroll: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dfe3e8",
  },

  notesContent: {
    padding: 18,
  },

  unitHeading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#202124",
    marginBottom: 16,
  },

  sectionLabel: {
    marginTop: 7,
    marginBottom: 7,
    fontSize: 11,
    fontWeight: "800",
    color: "#4d8f38",
    letterSpacing: 1,
  },

  topic: {
    fontSize: 13,
    lineHeight: 20,
    color: "#555b63",
  },

  divider: {
    height: 1,
    backgroundColor: "#e7e9ec",
    marginVertical: 18,
  },

  noteLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#30343a",
    marginBottom: 8,
  },

  textInput: {
    minHeight: 420,
    borderWidth: 1,
    borderColor: "#e0e3e7",
    borderRadius: 8,
    padding: 13,
    fontSize: 15,
    lineHeight: 23,
    color: "#22252a",
    backgroundColor: "#fffef8",
  },

  saveStatus: {
    fontSize: 11,
    color: "#6b7280",
  },
});