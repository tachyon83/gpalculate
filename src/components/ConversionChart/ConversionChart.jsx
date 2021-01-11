import React from "react";
import styles from "./conversionChart.module.css";

export const ConversionChart = React.memo(
  ({ conversionArr, columnNum, cn }) => {
    const Column = ({ startIndex, endIndex }) => (
      <div className={styles.conversionColumn}>
        <div className={styles.conversionNumber}>
          {conversionArr.slice(startIndex, endIndex).map((single) => (
            <p key={`${single.number}-${single.letter}-1`}>
              {single.number ? single.number.toFixed(1) : "N/A"}
            </p>
          ))}
        </div>
        <div className={styles.conversionLetter}>
          {conversionArr.slice(startIndex, endIndex).map((single) => (
            <p key={`${single.number}-${single.letter}-2`}>{single.letter}</p>
          ))}
        </div>
      </div>
    );

    return (
      <div className={`${styles.whiteBody} ${styles.conversionBody} ${cn}`}>
        {columnNum === 3 ? (
          <>
            <Column startIndex={0} endIndex={4} />
            <Column startIndex={4} endIndex={8} />
            <Column startIndex={8} endIndex={12} />
          </>
        ) : (
          <>
            <Column startIndex={0} endIndex={3} />
            <Column startIndex={3} endIndex={6} />
            <Column startIndex={6} endIndex={9} />
            <Column startIndex={9} endIndex={12} />
          </>
        )}
      </div>
    );
  }
);
