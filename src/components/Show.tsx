import { FC, PropsWithChildren } from "react";

type FCC<P> = FC<PropsWithChildren<P>>;

export const Show: FCC<{ when?: boolean }> = (props) => {
    return <>{props.when ? <>{props.children}</> : null}</>;
};
