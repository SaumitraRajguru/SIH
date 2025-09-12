/**
 * Utility functions for growth prospects display
 */

export type GrowthProspect = 'low' | 'medium' | 'high' | 'very_high';

export interface GrowthProspectConfig {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const getGrowthProspectConfig = (prospect: GrowthProspect): GrowthProspectConfig => {
  switch (prospect) {
    case 'very_high':
      return {
        label: 'Very High Demand',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/20',
        borderColor: 'border-emerald-500/30'
      };
    case 'high':
      return {
        label: 'High Demand',
        color: 'text-green-400',
        bgColor: 'bg-green-500/20',
        borderColor: 'border-green-500/30'
      };
    case 'medium':
      return {
        label: 'Medium Demand',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
        borderColor: 'border-yellow-500/30'
      };
    case 'low':
      return {
        label: 'Low Demand',
        color: 'text-red-400',
        bgColor: 'bg-red-500/20',
        borderColor: 'border-red-500/30'
      };
    default:
      return {
        label: 'Unknown',
        color: 'text-gray-400',
        bgColor: 'bg-gray-500/20',
        borderColor: 'border-gray-500/30'
      };
  }
};

export const GrowthProspectBadge = ({ prospect }: { prospect: GrowthProspect }) => {
  const config = getGrowthProspectConfig(prospect);
  
  return (
    <span className={`text-xs px-2 py-1 rounded-full border ${config.bgColor} ${config.color} ${config.borderColor}`}>
      {config.label}
    </span>
  );
};
