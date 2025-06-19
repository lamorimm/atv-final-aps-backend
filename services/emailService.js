const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.enviarEmailComFiscalizacoes = async (
  emailDestino,
  fiscalizacoes,
  obraInfo,
  obraId 
) => {
  try {
    // Formatar as fiscalizações como HTML
    const fiscalizacoesHTML = fiscalizacoes
      .map(
        (f) => `
      <tr>
        <td>${f.data.toLocaleDateString()}</td>
        <td>${f.status}</td>
        <td>${f.observacoes || "Sem observações"}</td>
      </tr>
    `
      )
      .join("");

    const mailOptions = {
      from: `Sistema de Obras <${process.env.EMAIL_USER}>`,
      to: emailDestino,
      subject: `Fiscalizações da Obra: ${obraInfo.nome} (ID: ${obraId})`, // ID no assunto
      html: `
        <h1>Relatório de Fiscalizações</h1>
        <h2>Obra: ${obraInfo.nome}</h2>
        <p><strong>ID:</strong> ${obraId}</p>
        <p><strong>Responsável:</strong> ${obraInfo.responsavel}</p>
        
        <table border="1" cellpadding="5" cellspacing="0">
          <thead>
            <tr>
              <th>Data</th>
              <th>Status</th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            ${fiscalizacoesHTML}
          </tbody>
        </table>
        
        <p>Total de fiscalizações: ${fiscalizacoes.length}</p>
        <p><small>ID da obra: ${obraId}</small></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return { success: false, error: error.message };
  }
};