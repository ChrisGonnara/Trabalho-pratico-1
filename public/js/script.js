    const racas = [
    {
    nome: "Salsicha (Dachshund)",
    descricao: "Cão pequeno e comprido, conhecido por seu corpo alongado e pernas curtas.",
    caracteristicas: [
    "Corajoso e curioso, apesar do tamanho.",
    "Pode ser teimoso, mas é muito leal."
    ]
    },
    {
    nome: "Border Collie",
    descricao: "Raça extremamente inteligente e ativa, criada para o pastoreio.",
    caracteristicas: [
    "Alta energia e necessidade de exercício intenso.",
    "Obediente e muito focado em tarefas."
    ]
    },

    {
    nome: "Boiadeiro Australiano",
    descricao: "Cão forte e resistente, criado para trabalhar com gado em longas distâncias.",
    caracteristicas: [
    "Leal e protetor com o dono.",
    "Requer estímulo físico e mental constante."
    ]
    }
    ];

    racas.forEach(cachorro => {
    console.log(`Raça: ${cachorro.nome}`);
    console.log(`Descrição: ${cachorro.descricao}`);
    console.log("Características:");
    cachorro.caracteristicas.forEach(traco => console.log(`- ${traco}`));
    });