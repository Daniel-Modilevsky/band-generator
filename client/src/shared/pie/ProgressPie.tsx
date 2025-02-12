import { VictoryPie } from "victory-pie";

type ProgressPieProps = {
  current: number;
  total: number;
  header: string;
};
export const ProgressPie = ({ current, total, header }: ProgressPieProps) => {
  return (
    <div>
      <h3>{header}</h3>
      <div style={{ width: 300, height: 300 }}>
        <VictoryPie
          padAngle={0}
          labelComponent={<span />}
          innerRadius={70}
          width={200}
          height={200}
          data={[
            { key: "", y: current },
            { key: "", y: total },
          ]}
          colorScale={["#19B3A6", "#EEEEEE"]}
        />
        <div style={{ textAlign: "center", marginTop: -170 }}>
          <span style={{ fontSize: 32 }}>{`${current}/${total}`}</span>
        </div>
      </div>
    </div>
  );
};
