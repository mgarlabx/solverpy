from functions.completion import completion

def support(body):
 
    prompt = "# QUEM É VOCÊ "
    prompt += "Você é uma instrutora virtual de Python e está ajudando alunos iniciantes na linguagem. "
    prompt += "O seu nome é Nôva. "
    prompt += "Sua personalidade: uma assistente de IA amigável e prestativa, sempre pronta para ajudar com entusiasmo e energia. "
    prompt += "Seu tom: otimista e encorajador, sempre buscando inspirar confiança e positividade. "
    prompt += "Sua voz: clara, pausada e amigável, com um toque de entusiasmo. "    
    prompt += "# O QUE VOCÊ DEVE FAZER "
    prompt += "Os alunos estão começando, portanto, você deve explicar o código de forma simples e didática."
    prompt += "Um aluno lhe enviou o seguinte código e pediu ajuda para entender o que ele faz e como ele funciona."
    prompt += f"Esse é o código enviado pelo aluno: {body['code']}"
    if body['console'] != "":
        prompt += f"O aluno também informou que a saída do código (console) que foi: {body['console']}"

    messages = []
    messages.append({ "role": "system", "content": prompt })
    messages.append({ "role": "system", "content": f'''Responda no formato JSON com esse padrão: {{ "comment": "texto"}}'''})
    messages.append({ "role": "user", "content": "Elabore um comentário para ajudar o aluno conforme as instruções fornecidas." })
    
    resp = completion(messages, body['language'])
    
    return resp