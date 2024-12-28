document.addEventListener("DOMContentLoaded", () => {

  // 円グラフ
  var ctxDoughnut = document.getElementById("totalchart").getContext("2d");

  //合計の表示
  const counter = {
    id: 'counter',
    beforeDraw(chart) {
        const { ctx, chartArea: { width, height, left, top } } = chart;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        const centerX = left + width / 2;
        const centerY = top + height / 2;


        const lines = [
            { text: '合計', fontSize: 20 },
            { text: '¥〜', fontSize: 32 } 
        ];
        const lineHeight = 40; // 各行の間隔

        lines.forEach((line, index) => {
            const yOffset = (index - (lines.length - 1) / 2) * lineHeight;
            ctx.font = `${line.fontSize}px sans-serif`; // 行ごとのフォントサイズを設定
            ctx.fillText(line.text, centerX, centerY + yOffset);
        });

        ctx.restore();
    }
};


  var myDoughnutChart = new Chart(ctxDoughnut, {
    type: 'doughnut',
    //dataは仮データです
    data: {
      labels: ["YouTubePremium", "Netflix", "AmazonPrime", "DisneyPlus"],
      datasets: [{
        backgroundColor: ["#c97586", "#bbbcde", "#93b881", "#e6b422"],
        data: [1280, 1590, 600, 990]
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      //クリックした時の処理
      onClick(event, elements) {
        if (elements.length > 0) {
          window.location.href = "/content"; //一旦全てcontentに飛ばす
        }
      }
    },
    //円グラフのみ合計を表示
    plugins: [counter]
  });

  // 棒グラフ
  var ctxBar = document.getElementById("individualchart").getContext("2d");

  var myBarChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
      // data仮データです
      labels: ["YouTubePremium", "Netflix", "AmazonPrime", "DisneyPlus"],
      datasets: [{
        backgroundColor: ["#c97586", "#bbbcde", "#93b881", "#e6b422"],
        data: [1280, 1590, 600, 990]
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      //クリックした時の処理
      onClick(event, elements) {
        if (elements.length > 0) {
          window.location.href = "/content"; ////一旦全てcontentに飛ばす
        }
      }
    }
  });
});
