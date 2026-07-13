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

    return (
        <div className="filter">

            {categories.map(category => (
                <button
                    key={category.id}
                    className="filter-item"
                    onClick={() =>
                        setTypes(prev => ({
                            ...prev,
                            [category.id]: !prev[category.id]
                        }))
                    }
                >
                    <span
                        className={
                            `custom-checkbox ${
                                types[category.id]
                                    ? category.className
                                    : ""
                            }`
                        }
                    >
                        {types[category.id] && "✓"}
                    </span>

                    {category.name}

                </button>
            ))}

        </div>
    );
}

export default Filter;