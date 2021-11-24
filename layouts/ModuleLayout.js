import Link from "next/link"

export default function ModuleLayout({ children, name = "Application", cards = [], activeIndex = 0 }) {
    return (
        <div className="px-3">
            <h4>{name} Management</h4>
            <div className="row row-cols-4 my-5">
                {
                    cards.map((card, i) => (
                        <div className="col" key={i}>
                            <Link href={card.link} passHref>
                                <div className={"card cursor-pointer px-4 py-3 " + ((activeIndex === i) && "border-danger")}
                                     style={{ boxShadow: "0px 10px 20px #00000012" }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className={"text-secondary"}>{card.name}</div>
                                        <div
                                            className={"rounded-circle d-flex align-items-center justify-content-center font-weight-bold text-white bg-" + card.color}
                                            style={{ width: 27, height: 27, fontSize: 13 }}><span
                                            className="pt-1">{card.value}</span></div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
            {children}
        </div>
    )
}