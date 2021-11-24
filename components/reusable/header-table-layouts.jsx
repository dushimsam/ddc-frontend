

const HeaderTableLayout = ({ title, Content,Toolbar }) => {
    return (
        <div className="container p-1">
            <div className="row justify-content-between p-3">
                <div className="col-6">
                    <p className="h5 font-weight-bold ml-5" style={styles.title}>{title}</p>
                </div>
                <div className="col-5">
                    <p className="cursor-pointer text-primary">{!Toolbar ? "Report": Toolbar }</p>
                </div>
            </div>
            <div className="row pt-2">
                <div className="col-12">
                    {Content}
                </div>
            </div>
        </div>
    )
}

const styles={
    title:{
       fontSize:"1.15em"
    },
  

}

export default HeaderTableLayout;

