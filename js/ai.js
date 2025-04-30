const apiKey = "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"; // ⚡️ Cuidado: chave visível!
const model = "llama3-8b-8192";
const groqUrl = "https://api.groq.com/openai/v1/chat/completions";

let sessionMessages = [];

async function initializeSession() {
    const response = await fetch("json/myInfoData.json");
    const myInfoData = await response.json();

    sessionMessages = [
        { role: 'system', content: "Seu idioma padrão deve ser Português (Brasil), mas você deve responder de acordo ao idioma da questão." },
        { role: 'system', content: "Você é uma inteligência que responde questões sobre Aléssio. Você não responde questões não relacionadas a Aléssio." },
        { role: 'system', content: `Aqui está algumas inforamções sobre Aléssio: ${JSON.stringify(myInfoData)}` },
    ];
}

async function askQuestion(question) {
    sessionMessages.push({ role: 'user', content: question });
  
    const response = await fetch(groqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: sessionMessages
      })
    });
  
    const data = await response.json();
    const assistantMessage = data.choices[0].message;
    sessionMessages.push(assistantMessage);
  
    return assistantMessage.content;
}  

async function main() {
    await initializeSession();
    await askQuestion("O que é um porquinho da india?");
    await askQuestion("Where does Aléssio live?");
    await askQuestion("Quantos anos tem Aléssio?");
}

//main();
