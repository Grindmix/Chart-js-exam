let bar = new Chart($("#bar"), {
    type: 'bar',
    data: {
        labels: years,
        datasets: [
            {
                data: numOfShipment,
                backgroundColor: 'blue',
            }
        ]},
    options: {
        plugins: {
            legend: false,
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Year"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Billions of Units"
                }
            }
        }
}
})

let doughnut = new Chart($("#doughnut"),{
    type: 'doughnut',
    data: {
        labels: companies,
        datasets: [
            {
                data: marketSharePercentage,
                backgroundColor: companyColors
            }
        ]
    },
    plugins: [ChartDataLabels],
    options: {
        tooltips: {
          enabled: false
        },
        plugins: {
            legend:{
                position: 'right',
            },
            datalabels: {
                formatter: (value, ctx) => {
                const datapoints = ctx.chart.data.datasets[0].data
                const total = datapoints.reduce((total, datapoint) => total + datapoint, 0)
                const percentage = value / total * 100
                return percentage.toFixed(2) + "%";
            },
            color: '#fff',
          }
        }
      }
})

let tsmc_chart = new Chart($("#tsmcChart"), {
    type: 'bar',
    data: {
        datasets: [
            {
                label: "Real income",
                data: [],
                backgroundColor: "green"
            },
            {
                label: "Expected income",
                data: [],
                backgroundColor: "blue"
            }
        ]
    }
})

function getData(chart){
    $.ajax({
        url: '/get_tsmc_data',
        type: 'POST',
        dataType: 'json',
        success: function(data){
            let real_income = []
            let expected_income = []
            let dates = []
            data.forEach(obj => {
                real_income.push(obj["income_fact"]),
                expected_income.push(obj["income_prediction"]),
                dates.push(obj["dt"])
            });
            
            dates = dates.map(date => date.slice(8, 17));

            chart.data.labels = dates.reverse();
            chart.data.datasets[0].data = real_income.reverse();
            chart.data.datasets[1].data = expected_income.reverse();
            chart.update();
        }
    })
}

$(function(){
    getData(tsmc_chart);
})