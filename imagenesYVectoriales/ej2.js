document.addEventListener("DOMContentLoaded",function(){

  const datos=document.getElementById('selDatos');

  const datos1={
      data: [12, 60, 80, 90, 20, 45, 20],
      categoria:['A', 'B', 'C', 'D', 'E', 'F', 'G']
    }
  
  const datos2={
      data: [40, 75, 80, 30, 50, 65, 80],
      categoria:['A', 'B', 'C', 'D', 'E', 'F', 'G']
    }

    let chart,chart2;
    
    datos.addEventListener("change",function(){
    
      if(chart || chart2){
        chart.destroy();
        chart2.destroy();
      }

    mostrarGraficos(datos.value);
    chart = new ApexCharts(document.getElementById("chart"), options);
    chart2 = new ApexCharts(document.getElementById("chart2"), options2);

    chart.render();
    chart2.render();
  });

  function mostrarGraficos(datos){
    if(datos==="datos1"){
      options = {
        chart: {
          type: 'bar'
        },
        series: [{
          name: 'sales',
          data: datos1.data
        }],
        xaxis: {
          categories: datos1.categoria
        }
      }
        
    options2 = {
              series: datos1.data, 
              labels: datos1.categoria, 
              chart: {
              type: 'donut',
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 25
                },
                legend: {
                  position: 'bottom'
                },
                
              }
            }]
        };
    }else if (datos==="datos2"){
          options = {
            chart: {
              type: 'bar'
            },
            series: [{
              name: 'sales',
              data: datos2.data
            }],
            xaxis: {
              categories: datos2.categoria
            }
          }
        
        options2 = {
                  series: datos2.data,
                  labels: datos2.categoria,
                  chart: {
                  type: 'donut'
                },
                responsive: [{
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 25
                    },
                    legend: {
                      position: 'bottom'
                    },
                    
                  }
                }]
            };
    }else{
      alert("Elija un conjunto de datos");
    }
    return options, options2 ;
  }
});