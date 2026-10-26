import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  EnrichedText,
  EnrichedTextInput,
  type EnrichedTextHtmlStyle,
  type EnrichedTextInputInstance,
  type HtmlStyle,
  type OnChangeStateEvent,
} from 'react-native-enriched-html';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { SAMPLES } from './src/samples';
import { Toolbar } from './src/Toolbar';

const ACCENT = '#3b5bdb';

const htmlStyle: HtmlStyle = {
  h1: { fontSize: 28, bold: true },
  h2: { fontSize: 22, bold: true },
  h3: { fontSize: 18, bold: true },
  blockquote: { borderColor: ACCENT, borderWidth: 4, gapWidth: 12, color: '#4b5563' },
  codeblock: { color: '#e5e7eb', backgroundColor: '#1f2937', borderRadius: 8 },
  code: { color: '#c2255c', backgroundColor: '#fff0f6' },
  a: { color: ACCENT, textDecorationLine: 'underline' },
  mention: {
    '@': { color: ACCENT, backgroundColor: '#e7ecff' },
    '#': { color: '#2b8a3e', backgroundColor: '#ebfbee' },
  },
  ul: { bulletColor: ACCENT, bulletSize: 6, marginLeft: 16, gapWidth: 10 },
  ol: { markerColor: ACCENT, markerFontWeight: '700', marginLeft: 16, gapWidth: 10 },
  ulCheckbox: { boxColor: ACCENT, boxSize: 18, gapWidth: 10, marginLeft: 16 },
};

const textHtmlStyle: EnrichedTextHtmlStyle = {
  ...htmlStyle,
  a: { ...htmlStyle.a, pressColor: '#1c3aa9' },
};

const MENTION_USERS = ['igor', 'expo', 'swmansion'];

export default function App() {
  const editorRef = useRef<EnrichedTextInputInstance>(null);
  const [editorState, setEditorState] = useState<OnChangeStateEvent | null>(null);
  const [html, setHtml] = useState(SAMPLES[0].html);
  const [mentionQuery, setMentionQuery] = useState<{ indicator: string; text: string } | null>(
    null
  );
  const [selection, setSelection] = useState({ start: 0, end: 0, text: '' });
  const [showSource, setShowSource] = useState(false);

  const insertLink = () => {
    const { start, end, text } = selection;
    if (start === end) {
      Alert.alert('Select some text first', 'Highlight the words you want to turn into a link.');
      return;
    }
    editorRef.current?.setLink(start, end, text, 'https://docs.swmansion.com/react-native-enriched-html/');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>react-native-enriched-html</Text>
          <Text style={styles.subtitle}>
            Expo SDK 58 · {Platform.OS} · native rich text editor & renderer
          </Text>

          <Text style={styles.section}>Load a sample</Text>
          <View style={styles.chips}>
            {SAMPLES.map((sample) => (
              <Pressable
                key={sample.label}
                style={styles.chip}
                onPress={() => editorRef.current?.setValue(sample.html)}
              >
                <Text style={styles.chipLabel}>{sample.label}</Text>
              </Pressable>
            ))}
            <Pressable style={styles.chip} onPress={insertLink}>
              <Text style={styles.chipLabel}>🔗 Link selection</Text>
            </Pressable>
            <Pressable style={styles.chip} onPress={() => editorRef.current?.setValue('')}>
              <Text style={styles.chipLabel}>Clear</Text>
            </Pressable>
          </View>

          <Text style={styles.section}>Editor</Text>
          <Toolbar editorRef={editorRef} state={editorState} />
          <EnrichedTextInput
            ref={editorRef}
            defaultValue={SAMPLES[0].html}
            placeholder="Start typing… try “- ”, “1. ” or “# ”"
            placeholderTextColor="#9ca3af"
            selectionColor={ACCENT}
            cursorColor={ACCENT}
            htmlStyle={htmlStyle}
            mentionIndicators={['@', '#']}
            textShortcuts={[
              { trigger: '- ', style: 'unordered_list' },
              { trigger: '1. ', style: 'ordered_list' },
              { trigger: '[] ', style: 'checkbox_list' },
              { trigger: '# ', style: 'h1' },
              { trigger: '## ', style: 'h2' },
              { trigger: '> ', style: 'blockquote' },
            ]}
            onChangeHtml={(e) => setHtml(e.nativeEvent.value)}
            onChangeState={(e) => setEditorState(e.nativeEvent)}
            onChangeSelection={(e) => setSelection(e.nativeEvent)}
            onStartMention={(indicator) => setMentionQuery({ indicator, text: '' })}
            onChangeMention={(e) => setMentionQuery(e)}
            onEndMention={() => setMentionQuery(null)}
            style={styles.editor}
          />

          {mentionQuery && (
            <View style={styles.mentions}>
              {MENTION_USERS.filter((u) => u.startsWith(mentionQuery.text.toLowerCase())).map(
                (user) => (
                  <Pressable
                    key={user}
                    style={styles.mentionItem}
                    onPress={() =>
                      editorRef.current?.setMention(
                        mentionQuery.indicator,
                        `${mentionQuery.indicator}${user}`,
                        { id: user }
                      )
                    }
                  >
                    <Text style={styles.mentionLabel}>
                      {mentionQuery.indicator}
                      {user}
                    </Text>
                  </Pressable>
                )
              )}
            </View>
          )}

          <Text style={styles.section}>Rendered with {'<EnrichedText>'}</Text>
          <View style={styles.card}>
            <EnrichedText
              htmlStyle={textHtmlStyle}
              style={styles.preview}
              selectable
              onLinkPress={({ url }) => Alert.alert('Link pressed', url)}
              onMentionPress={({ text, attributes }) =>
                Alert.alert('Mention pressed', `${text}\n${JSON.stringify(attributes)}`)
              }
            >
              {html}
            </EnrichedText>
          </View>

          <Pressable onPress={() => setShowSource((v) => !v)}>
            <Text style={styles.section}>{showSource ? '▾' : '▸'} HTML output</Text>
          </Pressable>
          {showSource && (
            <View style={[styles.card, styles.source]}>
              <Text selectable style={styles.sourceText}>
                {html}
              </Text>
            </View>
          )}
        </ScrollView>
        <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f8fa' },
  content: { padding: 16, paddingBottom: 48 },
  title: { fontSize: 24, fontWeight: '800', color: '#111827' },
  subtitle: { fontSize: 13, color: '#6b7280', marginTop: 4 },
  section: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#6b7280',
    marginTop: 24,
    marginBottom: 8,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chipLabel: { fontSize: 13, fontWeight: '600', color: '#1f2937' },
  editor: {
    minHeight: 200,
    maxHeight: 360,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  mentions: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  mentionItem: { padding: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#e5e7eb' },
  mentionLabel: { fontSize: 15, color: ACCENT, fontWeight: '600' },
  card: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  preview: { fontSize: 16, color: '#111827' },
  source: { backgroundColor: '#111827', borderColor: '#111827' },
  sourceText: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
    fontSize: 12,
    color: '#e5e7eb',
  },
});
