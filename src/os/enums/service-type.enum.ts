export enum ServiceType {
  ADESIVO = 'adesivo',
  LONA = 'lona',
  TELA_ORTOFONICA = 'tela ortofônica',
  ADESIVO_PERFURADO = 'adesivo perfurado',
}

export const SERVICE_PRICES: Record<ServiceType, number> = {
  [ServiceType.ADESIVO]: 35,
  [ServiceType.LONA]: 45,
  [ServiceType.TELA_ORTOFONICA]: 82,
  [ServiceType.ADESIVO_PERFURADO]: 37,
};
