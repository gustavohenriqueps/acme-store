type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="bg-zinc-100 rounded-md flex justify-center items-center flex-col p-4 gap-1 ">
    <Icon className="size-5 text-zinc-400" strokeWidth={1.5} />
    <h5 className="font-medium text-sm">{title}</h5>
    <p className="text-zinc-500 font-medium text-sm">{description}</p>
  </div>
);

export default FeatureCard;
