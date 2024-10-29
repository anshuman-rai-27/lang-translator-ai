"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "hi", name: "Hindi" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ru", name: "Russian" },
    { code: "pt", name: "Portuguese" },
    { code: "ar", name: "Arabic" },
    { code: "ko", name: "Korean" },
    { code: "nl", name: "Dutch" },
    { code: "tr", name: "Turkish" },
    { code: "pl", name: "Polish" },
    { code: "sv", name: "Swedish" },
    { code: "no", name: "Norwegian" },
    { code: "da", name: "Danish" },
    { code: "fi", name: "Finnish" },
    { code: "th", name: "Thai" },
  ];

export function LanguageTranslator() {
  const [inputLang, setInputLang] = useState("en");
  const [outputLang, setOutputLang] = useState("hi");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  useCopilotReadable({ description: "Available languages", value: JSON.stringify(languages) });
  useCopilotReadable({ description: "Input language", value: inputLang });
  useCopilotReadable({ description: "Output language", value: outputLang });
  useCopilotReadable({ description: "Input text", value: inputText });

  useCopilotAction({
    name: "Translate",
    description: "Translate input text",
    parameters: [
      { name: "inputLang", description: "Input language code", type: "string" },
      { name: "outputLang", description: "Output language code", type: "string" },
      { name: "inputText", description: "Text to translate", type: "string" },
    ],
    handler: async ({ inputLang, outputLang, inputText }) => {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputLang, outputLang, inputText }),
      });
      const data = await response.json();
      setOutputText(data.outputText);
    }
  });

  const handleTranslate = async () => {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputLang, outputLang, inputText }),
    });
    const data = await response.json();
    setOutputText(data.outputText);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 dark:bg-black overflow-y-auto">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        Language Translator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-center">
        Effortlessly translate your text into over 20 languages! Perfect for travel, study, or connecting with friends around the globe.
      </p>
      <div className="bg-white dark:bg-transparent shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-blue-800 dark:text-gray-300 mb-4">
          Select Languages
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select value={inputLang} onValueChange={setInputLang}>
            <SelectTrigger className="border border-gray-text-gray-300 dark:border-gray-300 rounded-md p-2 dark:bg-gray-300">
              <SelectValue placeholder="Input Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={outputLang} onValueChange={setOutputLang}>
            <SelectTrigger className="border border-gray-text-gray-300 dark:border-gray-300 rounded-md p-2 dark:bg-gray-300">
              <SelectValue placeholder="Output Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <h2 className="text-2xl font-semibold text-blue-700 dark:text-gray-300 mb-4">
          Enter Your Text
        </h2>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <Textarea
            placeholder="Type text to translate..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="h-40 p-4 border border-blue-300 dark:border-blue-500 rounded-lg shadow-md dark:bg-gray-700 dark:text-gray-200"
          />
          <div
            className="border border-blue-300 dark:border-blue-500 rounded-lg p-4 h-40 overflow-auto bg-gray-100 dark:bg-gray-700 shadow-md dark:text-gray-200"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setOutputText(e.currentTarget.textContent || "")}
          >
            {outputText}
          </div>
        </div>
        <Button
          onClick={handleTranslate}
          className="w-full bg-gray-300 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Translate
        </Button>
      </div>
    </div>
  );
}
