import { TeamMemberDataType } from "@/db/teamMembersOneData"
import { Link } from "react-router-dom"

const TeamCard = ({ member }: { member: TeamMemberDataType }) => {
    return (
        <div className="team-card-items">
            <div className="team-image">
                <img src={member.image} alt="team-img" />
            </div>
            <div className="team-content">
                <h4>
                    <Link to="/team-details">{member.name}</Link>
                </h4>
                <p>{member.role}</p>
            </div>
        </div>
    )
}

export default TeamCard
