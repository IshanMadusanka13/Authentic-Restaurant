function Dashboard() {
  return (
    <div className="dashboard-hero">
      <div className="dashboard-overlay">
        <h1>
          Order<br />
          Your<br />
          Favorite<br />
          Food<br />
          Here...
        </h1>
        <p>
          Discover a carefully crafted menu offering a wide range of mouthwatering dishes, prepared with the finest ingredients and a dedication to culinary excellence. Our goal is to make every meal a memorable experience, filled with flavor and satisfaction.
        </p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
        alt="Food"
        className="dashboard-img"
      />
    </div>
  );
}

export default Dashboard;