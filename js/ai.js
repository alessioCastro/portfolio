const apiKey = "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"; // ⚡️ Cuidado: chave visível!
const model = "llama3-8b-8192";
const groqUrl = "https://api.groq.com/openai/v1/chat/completions";

let sessionMessages = [];

async function initializeSession() {
    const response = await fetch("json/myInfoData.json");
    const myInfoData = await response.json();

    sessionMessages = [
        { role: 'system', content: "You are an intelligence on my website that answers questions about me. Do not answer questions that are not related to me. Please, answer each question according to the language of the question." },
        { role: 'system', content: `Here is some information about me: ${JSON.stringify(myInfoData)}` },
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

    console.log(question);
    console.log(assistantMessage.content);
}

async function main() {
    await initializeSession();
    await askQuestion("O que é um porquinho da india?");
    await askQuestion("Where does Aléssio live?");
    await askQuestion("Quantos anos tem Aléssio?");
}

//main();