
import { LanguageTranslator } from "@/components/language-translator";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <CopilotKit runtimeUrl="/api/copilotkit">
        <div className="overflow-hidden">
          <div className="min-h-screen flex dark overflow-hidden ">
            {/* <GlobeDemo/> */}
            <Image
              src="/lang.jpg"
              width={832}
              height={1472}
              alt="Picture of the author"
              className="h-[100vh]"
            />
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
