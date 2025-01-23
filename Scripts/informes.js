document.addEventListener('DOMContentLoaded', function() {
    // Configuración común para todos los gráficos
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 12,
                    padding: 15,
                    font: {
                        size: window.innerWidth < 768 ? 10 : 12
                    }
                }
            }
        }
    };

    // Configuración para el gráfico de departamentos
    const departmentChart = new Chart(
        document.getElementById('departmentChart'),
        {
            type: 'doughnut',
            data: {
                labels: ['TTD', 'RRHH', 'Finanzas', 'Operaciones', 'Marketing'],
                datasets: [{
                    data: [30, 20, 15, 25, 10],
                    backgroundColor: [
                        '#DC0032',
                        '#2C3E50',
                        '#3498DB',
                        '#27AE60',
                        '#F1C40F'
                    ]
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        ...commonOptions.plugins.legend,
                        display: window.innerWidth > 480
                    }
                }
            }
        }
    );

    // Configuración para el gráfico de contrataciones
    const hiringChart = new Chart(
        document.getElementById('hiringChart'),
        {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Contrataciones',
                    data: [5, 8, 12, 7, 9, 12],
                    borderColor: '#DC0032',
                    tension: 0.4
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45,
                            font: {
                                size: window.innerWidth < 768 ? 8 : 10
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: window.innerWidth < 768 ? 8 : 10
                            }
                        }
                    }
                }
            }
        }
    );

    // Manejar el redimensionamiento de la ventana
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth < 768;
        const isSmallMobile = window.innerWidth < 480;
        
        // Actualizar tamaño de fuente de las leyendas
        [departmentChart, hiringChart].forEach(chart => {
            if (chart.options.plugins.legend) {
                chart.options.plugins.legend.labels.font.size = isMobile ? 10 : 12;
            }
            
            if (chart.options.scales) {
                chart.options.scales.x.ticks.font.size = isMobile ? 8 : 10;
                chart.options.scales.y.ticks.font.size = isMobile ? 8 : 10;
            }
        });

        // Mostrar/ocultar leyenda en móviles pequeños
        departmentChart.options.plugins.legend.display = !isSmallMobile;

        // Actualizar los gráficos
        departmentChart.update();
        hiringChart.update();
    });
}); 