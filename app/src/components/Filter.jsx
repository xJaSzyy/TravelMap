import {useRef} from "react";
import {categories} from "../data/categories.js";

function Filter({types, setTypes}) {

    const lastClick = useRef(0);

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