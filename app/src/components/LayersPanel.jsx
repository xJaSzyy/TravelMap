function LayersPanel({layers, activeLayer, setActiveLayer}) {

    return (
        <div className="layers-panel">

            {layers.map((layer) => (

                <button
                    key={layer}
                    className="filter-item"
                    type="button"
                    onClick={() => {
                        setActiveLayer(layer);
                    }}
                >

                    <span className="custom-checkbox marker-default">
                        {activeLayer === layer && "✓"}
                    </span>

                    {layer}

                </button>

            ))}

        </div>
    );
}

export default LayersPanel;