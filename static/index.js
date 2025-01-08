document.addEventListener("DOMContentLoaded", () => {
  console.log("Window contents_dict:", window.contents_dict);
  if (!window.contents_dict) {
    console.error("contents_dictが定義されていません");
    return;
  }

  //contents_dictを取得
  const contents_dict = window.contents_dict;
  const labels = contents_dict.map((content) => content.name);
  const prices = contents_dict.map((content) => content.price);

  let isYearly = false;

  //合計計算関数
  function calculateSum(data) {
    return data.reduce((sum, price) => sum + price, 0);
  }

  //初期合計
  let sum = calculateSum(prices);

  //月・年切り替えボタンの要素
  const monthButton = document.getElementById("month-button");
  const yearButton = document.getElementById("year-button");

  //合計の表示
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      const {
        ctx,
        chartArea: { width, height },
      } = chart;
      const centerX = chart.chartArea.left + width / 2;
      const centerY = chart.chartArea.top + height / 2;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      //合計タイトル
      ctx.font = "20px sans-serif";
      ctx.fillStyle = "black";
      ctx.fillText("合計", centerX, centerY - 10);

      //合計値
      ctx.font = "32px sans-serif";
      ctx.fillStyle = "#000";
      ctx.fillText(`¥${sum.toLocaleString()}`, centerX, centerY + 20);

      ctx.restore();
    },
  };

  //グラフデータ更新関数
  function updateChartData() {
    const data = isYearly ? prices.map((price) => price * 12) : prices;
    sum = calculateSum(data); //合計を再計算
    myDoughnutChart.data.datasets[0].data = data;
    myDoughnutChart.update();

    myBarChart.data.datasets[0].data = data;
    myBarChart.update();
  }

  //ボタンのクリック
  monthButton.addEventListener("click", () => {
    if (!isYearly) return;
    isYearly = false;
    monthButton.classList.add("active");
    yearButton.classList.remove("active");
    updateChartData();
  });

  yearButton.addEventListener("click", () => {
    if (isYearly) return;
    isYearly = true;
    yearButton.classList.add("active");
    monthButton.classList.remove("active");
    updateChartData();
  });

  //円グラフ
  const ctxDoughnut = document.getElementById("totalchart").getContext("2d");
  const myDoughnutChart = new Chart(ctxDoughnut, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: ["#c97586", "#bbbcde", "#93b881", "#e6b422"],
          data: prices,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      onClick(event, elements) {
        if (elements.length > 0) {
          const index = elements[0].index;
          const targetId = contents_dict[index].id;
          window.location.href = `/content/${targetId}`;
        }
      },
    },
    //円グラフのみ合計を表示
    plugins: [centerTextPlugin],
  });

  //棒グラフ
  const ctxBar = document.getElementById("individualchart").getContext("2d");
  const myBarChart = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: ["#c97586", "#bbbcde", "#93b881", "#e6b422"],
          data: prices,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      //クリックした時の処理
      onClick(event, elements) {
        if (elements.length > 0) {
          const index = elements[0].index; // クリックされたデータポイントのインデックスを取得
          const targetId = contents_dict[index].id; // contents_dict から該当する ID を取得
          window.location.href = `/content/${targetId}`; // ID を含む URL に遷移
        }
      },
    },
  });
});
