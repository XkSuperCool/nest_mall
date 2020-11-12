import * as md5 from 'md5';

export default function(message: string): string {
  return md5(message);
}
