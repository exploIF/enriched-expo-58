import type { RefObject } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import type {
  EnrichedTextInputInstance,
  OnChangeStateEvent,
} from 'react-native-enriched-html';

type StyleKey = Exclude<keyof OnChangeStateEvent, 'alignment'>;

type Item = {
  label: string;
  stateKey?: StyleKey;
  onPress: (editor: EnrichedTextInputInstance) => void;
};

const ITEMS: Item[] = [
  { label: 'B', stateKey: 'bold', onPress: (e) => e.toggleBold() },
  { label: 'I', stateKey: 'italic', onPress: (e) => e.toggleItalic() },
  { label: 'U', stateKey: 'underline', onPress: (e) => e.toggleUnderline() },
  { label: 'S', stateKey: 'strikeThrough', onPress: (e) => e.toggleStrikeThrough() },
  { label: '</>', stateKey: 'inlineCode', onPress: (e) => e.toggleInlineCode() },
  { label: 'H1', stateKey: 'h1', onPress: (e) => e.toggleH1() },
  { label: 'H2', stateKey: 'h2', onPress: (e) => e.toggleH2() },
  { label: 'H3', stateKey: 'h3', onPress: (e) => e.toggleH3() },
  { label: '•', stateKey: 'unorderedList', onPress: (e) => e.toggleUnorderedList() },
  { label: '1.', stateKey: 'orderedList', onPress: (e) => e.toggleOrderedList() },
  { label: '☑', stateKey: 'checkboxList', onPress: (e) => e.toggleCheckboxList(false) },
  { label: '❝', stateKey: 'blockQuote', onPress: (e) => e.toggleBlockQuote() },
  { label: '{ }', stateKey: 'codeBlock', onPress: (e) => e.toggleCodeBlock() },
  { label: '@', stateKey: 'mention', onPress: (e) => e.startMention('@') },
  { label: '⇤', onPress: (e) => e.setTextAlignment('left') },
  { label: '⇔', onPress: (e) => e.setTextAlignment('center') },
  { label: '⇥', onPress: (e) => e.setTextAlignment('right') },
];

type Props = {
  editorRef: RefObject<EnrichedTextInputInstance | null>;
  state: OnChangeStateEvent | null;
};

export function Toolbar({ editorRef, state }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.row}
    >
      {ITEMS.map((item) => {
        const itemState = item.stateKey ? state?.[item.stateKey] : undefined;
        return (
          <Pressable
            key={item.label}
            disabled={itemState?.isBlocking}
            onPress={() => editorRef.current && item.onPress(editorRef.current)}
            style={[
              styles.button,
              itemState?.isActive && styles.active,
              itemState?.isBlocking && styles.blocked,
            ]}
          >
            <Text style={[styles.label, itemState?.isActive && styles.activeLabel]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 6, paddingVertical: 8 },
  button: {
    minWidth: 38,
    height: 38,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#eef0f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: { backgroundColor: '#3b5bdb' },
  blocked: { opacity: 0.35 },
  label: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
  activeLabel: { color: '#fff' },
});
