document.addEventListener('DOMContentLoaded', () => {
    /* direccion api */
    const apiUrl = 'https://mindicador.cl/api/';

    /* que ocuparemos del dom */
    const montoInput = document.getElementById('monto');
    const monedaSelect = document.getElementById('moneda');
    const resultadoElement = document.getElementById('resultado');
    const buscarButton = document.querySelector('button');

    /* solicitud  */
    async function obtenerDatos(moneda) {
        try {
            const respuesta = await fetch(apiUrl + moneda);
            const datos = await respuesta.json();

            /* mostrar la moneda */
            mostrarDatos(datos);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    /* escucha del boton */
    buscarButton.addEventListener('click', () => {
        const monedaSeleccionada = monedaSelect.value;

        if (monedaSeleccionada !== 'seleccionar') {
            obtenerDatos(monedaSeleccionada);
        } else {
            resultadoElement.innerHTML = '';
            /* limpiar pantalla */
        }
    });

    // Obtén el contexto del canvas
    const chartCanvas = document.getElementById('chart');
    const ctx = chartCanvas.getContext('2d');

    /* grafico pelao */
    const chartData = {
        labels: [],
        datasets: [{
            label: 'Variación de Moneda',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true
        }]
    };

    // Crea un nuevo gráfico con los datos iniciales
    const chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    /* datos */
/* datos */
function mostrarDatos(data) {
    const valorConvertido = parseFloat(montoInput.value) / data.serie[0].valor;
    const html = `
        <h2>${data.nombre}</h2>
        <p>Valor: ${data.serie[0].valor}</p>
        <p>Valor Convertido: ${valorConvertido.toFixed(2)}</p>
        <p>Fecha: ${data.serie[0].fecha}</p>
    `;

    resultadoElement.innerHTML = html;

   /* arreglo que lee los datos de la "serie" sacado del video de la profe */
    const last10Data = data.serie.slice(Math.max(data.serie.length - 10, 0));
    const labels = last10Data.map(item => item.fecha);
    const values = last10Data.map(item => item.valor);

   /* actualiza valores del grafico */
    chart.data.labels = labels;
    chart.data.datasets[0].data = values;

    /* refrescar grafico */
    chart.update();
}

});


/* VISUALMENTE FEO PERO ES FUNCIONAL EL
 GRAFICO ES HORRIBLE YA QUE LOS DATOS NO TIENEN MUCHA VARIANTE ENTRE SI EN UNOS PAR DE DIAS 
 */