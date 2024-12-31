document.addEventListener("DOMContentLoaded", () => {
  //contents_dictが受け取れているか確認する
  console.log("Window contents_dict:", window.contents_dict);
  if (!window.contents_dict) {
    console.error("contents_dictが定義されていません");
    return;
  }

  //contents_dictを取得
  const contents_dict = window.contents_dict;
  // console.log("\ncontents_dict\n")
  // console.log(contents_dict);

  //contents_dictのnameとpriceを取得し、labelsとpricesに格納
  const labels = contents_dict.map((content) => content.name);
  const prices = contents_dict.map((content) => content.price);
  var sum = 0;
  for (const price of prices) {
    sum += price;
  }
  console.log(sum);
  // console.log(labels);
  // console.log(prices);
  // 円グラフ
  var ctxDoughnut = document.getElementById("totalchart").getContext("2d");

  //合計の表示
  const counter = {
    id: "counter",
    beforeDraw(chart) {
      const {
        ctx,
        chartArea: { width, height, left, top },
      } = chart;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "black";
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const lines = [
        { text: "合計", fontSize: 20 },
        { text: `¥${sum}`, fontSize: 32 },
      ];
      const lineHeight = 40; // 各行の間隔

      lines.forEach((line, index) => {
        const yOffset = (index - (lines.length - 1) / 2) * lineHeight;
        ctx.font = `${line.fontSize}px sans-serif`; // 行ごとのフォントサイズを設定
        ctx.fillText(line.text, centerX, centerY + yOffset);
      });

      ctx.restore();
    },
  };

  var myDoughnutChart = new Chart(ctxDoughnut, {
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
      //クリックした時の処理
      onClick(event, elements) {
        if (elements.length > 0) {
          window.location.href = "/content"; //一旦全てcontentに飛ばす
        }
      },
    },
    //円グラフのみ合計を表示
    plugins: [counter],
  });

  // 棒グラフ
  var ctxBar = document.getElementById("individualchart").getContext("2d");

  var myBarChart = new Chart(ctxBar, {
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
