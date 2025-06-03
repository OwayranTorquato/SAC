import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const { sugestoes, reclamacoes, elogios, melhorias, nota, satisfacao, date } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const corpo = `
Sugestões: ${sugestoes || '-'}
Reclamações: ${reclamacoes || '-'}
Elogios: ${elogios || '-'}
Melhorias: ${melhorias || '-'}
Nota: ${nota || '-'}
Satisfação: ${satisfacao || '-'}
Ideias para o próximo date: ${date || '-'}
    `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'owayran1998@gmail.com',
            subject: 'Novo feedback recebido pelo site',
            text: corpo
        });
        res.status(200).json({ message: 'Feedback enviado com sucesso! Obrigado.' });
    } catch (error) {
    console.error('Erro ao enviar o feedback:', error);
    res.status(500).json({ message: 'Erro ao enviar o feedback.', detalhe: error.message });
}
}

