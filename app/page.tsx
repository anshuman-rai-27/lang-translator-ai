import { GlobeDemo } from "@/components/globedemo";
import { LanguageTranslator } from "@/components/language-translator";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {
  return (
    <>
      <CopilotKit runtimeUrl="/api/copilotkit">
      <div className="overflow-hidden">
        <div className="min-h-screen flex dark overflow-hidden ">
        <GlobeDemo/>
        <LanguageTranslator />
        </div>
        <CopilotPopup
          instructions="As a language translator, your role is to assist users in converting text between different languages."
          labels={{
            title: "Translator",
            initial: "Hello! I'm here to assist you. I can help you translate text from one language to another.",
          }}
        />
        </div>
      </CopilotKit>
    </>
  );
}
