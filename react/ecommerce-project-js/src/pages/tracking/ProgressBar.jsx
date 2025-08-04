export default function ProgressBar({ progressPercentage }) {

  progressPercentage = progressPercentage > 100 ? 100 : progressPercentage;

  return (
    <>
      <div className="progress-labels-container">
        <div className={`progress-label ${progressPercentage < 50 && 'current-status'}`}>
          Preparing
        </div>
        <div className={`progress-label ${(progressPercentage >= 50 && progressPercentage < 100) && 'current-status'}`}>
          Shipped
        </div>
        <div className={`progress-label ${(progressPercentage === 100) && 'current-status'}`}>
          Delivered
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </>
  )

}