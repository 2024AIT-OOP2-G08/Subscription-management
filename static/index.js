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
  let displayStatus = prices.map(() => true);

  // サブスクがない場合の表示処理
  if (contents_dict.length === 0) {
    document.getElementById("no-subscription").classList.remove("hidden");
    document.getElementById("graphs-container").classList.add("hidden");
    document.getElementById("toggle-container").classList.add("hidden"); 
    document.getElementById("month-button").classList.add("hidden");
    document.getElementById("year-button").classList.add("hidden");

    return; // 処理を終了
  } else {
    document.getElementById("no-subscription").classList.add("hidden");
    document.getElementById("graphs-container").classList.remove("hidden");
    document.getElementById("toggle-container").classList.remove("hidden");
    document.getElementById("month-button").classList.remove("hidden");
    document.getElementById("year-button").classList.remove("hidden");
  }

  //合計計算関数
  function calculateSum(data, displayStatus) {
    return data.reduce((sum, price, index) => displayStatus[index] ? sum + price : sum, 0);
  }

  //初期合計
  let sum = calculateSum(prices, displayStatus);

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

      // 画面幅に応じてフォントサイズを調整
      const isMobile = window.innerWidth <= 768;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      //合計タイトル
      ctx.font = isMobile ? "16px sans-serif" : "20px sans-serif";
      ctx.fillStyle = "black";
      ctx.fillText("合計", centerX, centerY - (isMobile ? 8 : 10));

      //合計値
      ctx.font = isMobile ? "24px sans-serif" : "32px sans-serif";
      ctx.fillStyle = "#000";
      ctx.fillText(`¥${sum.toLocaleString()}`, centerX, centerY + (isMobile ? 16 : 20));

      ctx.restore();
    },
  };

  //グラフデータ更新関数
  function updateChartData() {
    const data = isYearly ? prices.map((price) => price * 12) : prices;
    sum = calculateSum(data, displayStatus); //合計を再計算
    myDoughnutChart.data.datasets[0].data = data;
    myDoughnutChart.update();

    myBarChart.data.datasets[0].data = data;
    myBarChart.update();
  }

  function updateSum() {
    sum = calculateSum(prices, displayStatus); // 表示状態に基づいて合計を再計算
    myDoughnutChart.update();
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

  // グラフ共通のオプション設定
  const chartOptions = {
    responsive: true,  // ウィンドウサイズに応じて自動でリサイズ
    maintainAspectRatio: true,  // アスペクト比を保持
    options: {
      plugins: {
        legend: {
          position: 'bottom',  // 凡例をグラフの下部に配置
          labels: {
            boxWidth: 20,     // 凡例の四角形のサイズを小さく
            padding: 10       // 凡例アイテム間の余白
          }
        }
      }
    }
  };

  //円グラフ
  const ctxDoughnut = document.getElementById("totalchart").getContext("2d");
  const myDoughnutChart = new Chart(ctxDoughnut, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: [
            "#c97586", "#bbbcde", "#93b881", "#e6b422", "#f39c12", "#d35400", "#16a085", "#2980b9", "#8e44ad", "#f1c40f", 
            "#2ecc71", "#1abc9c", "#3498db", "#9b59b6", "#34495e", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#dcdde1", 
            "#e67e22", "#f5b041", "#f7dc6f", "#f1c40f", "#27ae60", "#2c3e50", "#8e44ad", "#c0392b", "#16a085", "#f39c12"
          ],
          data: prices,
        },
      ],
    },
    options: {
      ...chartOptions,        // 共通オプションを展開
      onClick(event, elements) {
        if (elements.length > 0) {
          const index = elements[0].index; // クリックされたデータポイントのインデックスを取得
          const targetId = contents_dict[index].id; // contents_dict から該当する ID を取得
          window.location.href = `/content/${targetId}`; // ID を含む URL に遷移
        }
      },
      plugins: {
        legend: {
          display: true,
          onClick: (e, legendItem, legend) => {
            const index = legendItem.index;
            displayStatus[index] = !displayStatus[index];
            legend.chart.toggleDataVisibility(index);
            updateSum();
            if (isYearly) {
              const data = prices.map((price) => price * 12);
              sum = calculateSum(data, displayStatus);
              myDoughnutChart.update();
              myBarChart.update();
            }
          },
        },
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
          backgroundColor: [
            "#c97586", "#bbbcde", "#93b881", "#e6b422", "#f39c12", "#d35400", "#16a085", "#2980b9", "#8e44ad", "#f1c40f", 
            "#2ecc71", "#1abc9c", "#3498db", "#9b59b6", "#34495e", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#dcdde1", 
            "#e67e22", "#f5b041", "#f7dc6f", "#f1c40f", "#27ae60", "#2c3e50", "#8e44ad", "#c0392b", "#16a085", "#f39c12"
          ],
          data: prices,
          maxBarThickness: 100,
        },
      ],
    },
    options: {
      ...chartOptions,        // 共通オプションを展開
      indexAxis: "y",
      plugins: {
        legend: { display: false },
      },
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
