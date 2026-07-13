function Filter({types, setTypes}) {

    const categories = [
        {
            id: "food",
            name: "Еда",
            className: "marker-food"
        },
        {
            id: "walk",
            name: "Прогулки",
            className: "marker-walk"
        },
        {
            id: "rest",
            name: "Отдых",
            className: "marker-rest"
        },
        {
            id: "fun",
            name: "Развлечения",
            className: "marker-fun"
        }
    ];


    function toggle(type) {
        setTypes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    }


    return (
        <div className="filter">

            {categories.map(category => (
                <label
                    key={category.id}
                    className="filter-item"
                >
                    <input
                        type="checkbox"
                        checked={types[category.id]}
                        onChange={() => toggle(category.id)}
                    />

                    <span
                        className={`custom-checkbox ${category.className}`}
                    />

                    {category.name}

                </label>
            ))}

        </div>
    );
}

export default Filter;