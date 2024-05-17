export default function UserCard(props: any) {

    return (<>
 
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={'http://localhost:5000/customer/getimage/' + props.data.filename} width={400} /></figure>
            <div className="card-body">
                <h2 className="card-title">ID: {props.data.name}</h2>
                Name:  {props.data.name} <br />
                username:  {props.data.username}<br />
                address:  {props.data.address}<br />
                <div className="card-actions justify-end">
                <button className="btn btn-error">Delete</button>
                    <button className="btn btn-warning">Update</button>
                </div>
            </div>
            </div>

    </>);

}