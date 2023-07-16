<template>
  <div>
    <div class="overflow-hidden border w-full">
      <div class="tiptap-input bg-white border-b border-primary/10">
        <div v-if="editor" class="editor-menu">
          <div
            class="floating-menu flex-wrap w-full gap-x-2 gap-y-2"
            :tippy-options="{ duration: 100 }"
            :editor="editor"
          >
            <button
              type="button"
              @click="editor.chain().focus().toggleBulletList().run()"
              :class="{ 'is-active': editor.isActive('bulletList') }"
            >
              <i
                class="fa-solid fa-list-ul text-sm cursor-pointer text-gray-600"
              ></i>
            </button>
            <template v-if="hasLink">
              <button
                type="button"
                @click="setLink"
                :class="{ 'is-active': editor.isActive('link') }"
              >
                <i
                  class="fa-solid fa-link text-sm cursor-pointer text-gray-600"
                ></i>
              </button>
              <button
                type="button"
                @click="editor.chain().focus().unsetLink().run()"
                :disabled="!editor.isActive('link')"
              >
                <i
                  class="fa-solid fa-link-slash text-sm cursor-pointer text-gray-600"
                ></i>
              </button>
            </template>
            <button type="button" @click="addVideo" v-if="hasYoutubeLink">
              <FontAwesomeIcon
                :icon="['fab', 'youtube']"
                class="text-lg cursor-pointer text-red-500"
              />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().setTextAlign('left').run()"
              :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
            >
              <FontAwesomeIcon
                icon="align-left"
                class="text-sm cursor-pointer text-gray-600"
              />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().setTextAlign('center').run()"
              :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
            >
              <FontAwesomeIcon
                icon="align-center"
                class="text-sm cursor-pointer text-gray-600"
              />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().setTextAlign('right').run()"
              :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
            >
              <FontAwesomeIcon
                icon="align-right"
                class="text-sm cursor-pointer text-gray-600"
              />
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleBold().run()"
              :class="{ 'is-active !font-lg': editor.isActive('bold') }"
            >
              <span class="!font-bold text-base"> B </span>
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleItalic().run()"
              :class="{ 'is-active !font-lg': editor.isActive('italic') }"
            >
              <span class="!font-bold text-base italic"> I </span>
            </button>
            <button
              type="button"
              class="text-lg"
              @click="editor.chain().focus().setHorizontalRule().run()"
            >
              -
            </button>
            <button
              v-for="n in 6"
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: n }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: n }) }"
            >
              H{{ n }}
            </button>

            <button
              type="button"
              class="text-lg"
              @click="editor.commands.undo()"
              :class="{ 'is-active': editor.isActive('bulletList') }"
            >
              <FontAwesomeIcon icon="undo" class="h-3.5 text-gray-600" />
            </button>
            <button
              type="button"
              class="text-lg"
              @click="editor.commands.redo()"
              :class="{ 'is-active': editor.isActive('bulletList') }"
            >
              <FontAwesomeIcon icon="redo" class="h-3.5 text-gray-600" />
            </button>
            <label
              v-if="hasHighlightOption"
              for="highlight"
              class="text-lg py-1 px-2 border-r flex items-center cursor-pointer"
            >
              <FontAwesomeIcon icon="highlighter" class="h-5 w-5" />
            </label>
            <input
              id="highlight"
              type="color"
              class="hidden"
              @input="setHighlight"
            />
            <div class="grid place-content-center px-2" v-if="hasBgOption">
              <input
                type="color"
                class="h-5 w-5"
                :value="editor.getAttributes('textStyle').color"
              />
            </div>
          </div>
        </div>
      </div>
      <editor-content
        class="px-5 pt-5 pb-3 overflow-auto"
        :class="classes ? classes : 'max-h-[300px] bg-white'"
        :editor="editor"
        :id="id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import TextStyle from "@tiptap/extension-text-style";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Youtube from "@tiptap/extension-youtube";
import Bold from "@tiptap/extension-bold";
import HardBreak from "@tiptap/extension-hard-break";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { type IconDefinition } from "@fortawesome/fontawesome-common-types";

export default defineComponent({
  components: {
    EditorContent,
    FontAwesomeIcon,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "",
    },
    hasYoutubeLink: {
      type: Boolean,
      default: false,
    },
    hasHighlightOption: {
      type: Boolean,
      default: false,
    },
    hasBgOption: {
      type: Boolean,
      default: false,
    },
    hasLink: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const editor = ref();
    const showVideoModal = ref();
    const width = ref();
    const height = ref();
    const url = ref();
    const alt = ref();

    watch(
      () => props.modelValue,
      (value) => {
        const isSame = editor.value.getHTML() === value;

        if (!isSame) {
          editor.value.commands.setContent(value, false);
        }
      }
    );

    const setLink = () => {
      const previousUrl = editor.value.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      if (url === null) {
        return;
      }

      if (url === "") {
        editor.value.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }

      editor.value
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    };

    const addVideo = () => {
      const url = prompt("Enter YouTube URL");
      if (isYoutubeUrl(url)) {
        editor.value.commands.setYoutubeVideo({
          src: url,
          width: Math.max(320, parseInt(width.value, 10)) || 640,
          height: Math.max(180, parseInt(height.value, 10)) || 480,
        });
      }
    };

    const updateLanguage = () => {
      if (props.language === "ku" || props.language === "ar") {
        editor.value.chain().focus().setTextAlign("right").run();
      } else {
        editor.value.chain().focus().setTextAlign("left").run();
      }
    };

    const isYoutubeUrl = (url: string | null) => {
      const regExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
      const match = url?.match(regExp);
      return match && match[0].length === url?.length;
    };

    const setHighlight = (e: any) => {
      editor.value
        .chain()
        .focus()
        .toggleHighlight({ color: e.target.value })
        .run();
    };

    return {
      editor,
      showVideoModal,
      width,
      height,
      url,
      alt,
      setLink,
      addVideo,
      updateLanguage,
      isYoutubeUrl,
      setHighlight,
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
          alignments: ["left", "center", "right", "justify"],
        }),
        Link.configure({
          openOnClick: false,
        }),
        Youtube.configure({
          inline: true,
          width: +"100%",
          controls: true,
        }),
        Heading.configure({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        Highlight.configure({
          multicolor: true,
        }),
        BulletList,
        ListItem,
        Color,
        TextStyle,
        Document,
        Paragraph,
        Text,
        Youtube,
        Bold,
        HardBreak,
        HorizontalRule,
        Highlight,
        Italic,
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit("update:modelValue", this.editor.getHTML());
      },
    });

    this.updateLanguage();
  },
  beforeUnmount() {
    this.editor.destroy();
  },
});
</script>
