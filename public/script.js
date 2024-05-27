document.getElementById('addPlayerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const jugadorName = document.getElementById('name').value;
    const edad = document.getElementById('edad').value;

    const response = await fetch('/api/jugador', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jugadorName, edad})
    });
    const result = await response.json();
    console.log(result);
    loadPlayers();
});

document.getElementById('addLoteryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const loteriaName = document.getElementById('loteryName').value;
    const creadorId = document.getElementById('creatorId').value;
    const creadorName = document.getElementById('creatorName').value;
    const response = await fetch('/api/loteria', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loteriaName, creadorId, creadorName })
    });
    const result = await response.json();
    console.log(result);
    loadLoterys();
});

document.getElementById('addTicketForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = document.getElementById('token').value;
    const jugadorId = document.getElementById('playerId').value;
    const loteriaId = document.getElementById('loteryId').value;

    const response = await fetch('/api/boleto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, jugadorId, loteriaId })
    });
    const result = await response.json();
    console.log(result);
    loadTickets();
});

async function loadPlayers() {
    const response = await fetch('/api/jugadores');
    const jugadores = await response.json();
    document.getElementById('jugadores').innerText = JSON.stringify(jugadores, null, 2);
}

async function loadLoterys() {
    const response = await fetch('/api/loterias');
    const loterias = await response.json();
    document.getElementById('loterias').innerText = JSON.stringify(loterias, null, 2);
}

async function loadTickets() {
    const response = await fetch('/api/boletos');
    const boletos = await response.json();
    document.getElementById('boletos').innerText = JSON.stringify(boletos, null, 2);
}

loadPlayers();
loadLoterys();
loadTickets();
