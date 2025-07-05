import GoogleAd from './GoogleAd';

const GoogleAdExample: React.FC = () => {
  return (
    <div className="ad-container">
      <h3>廣告範例</h3>
      
      {/* 基本使用 */}
      <GoogleAd />
      
      {/* 自訂樣式 */}
      <GoogleAd 
        adStyle={{
          width: '728px',
          height: '90px',
          margin: '20px auto',
          border: '1px solid #ccc'
        }}
      />
      
      {/* 響應式廣告 */}
      <GoogleAd 
        adStyle={{
          width: '100%',
          maxWidth: '728px',
          margin: '20px auto',
          minHeight: '90px'
        }}
      />
    </div>
  );
};

export default GoogleAdExample; 