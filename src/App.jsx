import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState(null);
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [feedback, setFeedback] = useState(null); // { tipo: "sucesso" | "erro", mensagem: "" }

  useEffect(() => {
    buscarPosts();
    buscarUsuarios();
  }, []);

  function buscarPosts() {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Erro ao buscar posts:", error));
  }

  function buscarUsuarios() {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  }

  async function cadastrarUsuario(event) {
    event.preventDefault();

    const novoUsuario = {
      name: name,
      email: email,
      telefone: telefone,
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      if (response.ok) {
        setFeedback({ tipo: "sucesso", mensagem: "Usuário cadastrado com sucesso." });

        setName("");
        setEmail("");
        setTelefone("");

        buscarUsuarios();
      } else {
        setFeedback({ tipo: "erro", mensagem: "Erro ao cadastrar usuário." });
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setFeedback({ tipo: "erro", mensagem: "Não foi possível conectar ao servidor." });
    }

    setTimeout(() => setFeedback(null), 4000);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>Gestão de Usuários</h1>
          <span className="header-sub">React + JSON Server</span>
        </div>
      </header>

      <main className="container main-content">

        <section className="panel">
          <div className="panel-header">
            <h2>Posts</h2>
            <span className="count">{posts ? posts.length : 0} registros</span>
          </div>
          <div className="cards-grid">
            {posts ? (
              posts.map((post) => (
                <div className="card" key={post.id}>
                  <h3>{post.title}</h3>
                  <p className="card-meta">Autor: {post.author}</p>
                </div>
              ))
            ) : (
              <p className="loading">Carregando...</p>
            )}
          </div>
        </section>

        <div className="bottom-grid">

          <section className="panel">
            <div className="panel-header">
              <h2>Novo Usuário</h2>
            </div>
            <form onSubmit={cadastrarUsuario} className="form" autoComplete="off">
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input
                  id="telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(event) => setTelefone(event.target.value)}
                  required
                />
              </div>

              <button type="submit">Salvar</button>

              {feedback && (
                <p className={`feedback feedback--${feedback.tipo}`}>
                  {feedback.mensagem}
                </p>
              )}
            </form>
          </section>

          <section className="panel">
            <div className="panel-header">
              <h2>Usuários</h2>
              <span className="count">{users.length} registros</span>
            </div>
            <div className="users-list">
              {users.length > 0 ? (
                users.map((user) => (
                  <div className="user-row" key={user.id}>
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                      <span>{user.telefone || "—"}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty">Nenhum registro encontrado.</p>
              )}
            </div>
          </section>

        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <span>Projeto acadêmico — André Luiz Martins Fávero &amp; Guilherme Otto de Souza Leal &nbsp;·&nbsp; React + Vite + JSON Server</span>
        </div>
      </footer>
    </div>
  );
}

export default App;