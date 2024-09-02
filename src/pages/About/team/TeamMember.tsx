import team1 from '../../../assets/images/team/team1.avif'
import team2 from '../../../assets/images/team/team2.avif'
import team3 from '../../../assets/images/team/team3.jpg'
import team4 from '../../../assets/images/team/team4.jpg'
import team5 from '../../../assets/images/team/team5.jpg'
import team6 from '../../../assets/images/team/team6.jpg'

const TeamMember = () => {
    const teamMembers = [
        {
          name: 'John Doe',
          role: 'CEO & Founder',
          image: team1,
        },
        {
          name: 'Jane Smith',
          role: 'Chief Marketing Officer',
          image: team2,
        },
        {
          name: 'Emily Johnson',
          role: 'Head of Design',
          image: team3,
        },
        {
          name: 'Michael Brown',
          role: 'Chief Technology Officer',
          image: team4,
        },
        {
          name: 'Williams',
          role: 'Lead Developer',
          image: team5,
        },
        {
          name: 'David Wilson',
          role: 'Product Manager',
          image: team6,
        },
      ];
    return (
        <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-600">
          Our <span className='text-[#FEA633]'>Team</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default TeamMember;