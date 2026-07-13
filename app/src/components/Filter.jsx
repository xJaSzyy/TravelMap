import {useRef} from "react";

function Filter({types, setTypes}) {

    const lastClick = useRef(0);

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
        const now = Date.now();

        if (now - lastClick.current < 400) {
            return;
        }

        lastClick.current = now;

        setTypes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    }

    return (
        <div
            className="filter"
            onTouchStart={(e) => e.stopPropagation()}
        >

            {categories.map(category => (
                <button
                    key={category.id}
                    className="filter-item"
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggle(category.id);
                    }}
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